import { getUserById, fetchAllUsersFromS3 } from '../../helpers/getUsers';

import {
  S3Client,
  DeleteObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';

export async function PUT(req) {
  try {
    const { firstname, lastname, email, originalEmail, id } = await req.json();
    console.log('request data', firstname, lastname, email, originalEmail, id);

    const allUsers = await fetchAllUsersFromS3();
    console.log('all users', allUsers);

    const userToUpdate = await getUserById(allUsers, id);
    console.log('user to update', userToUpdate);

    const user = allUsers.find((user) => user.id === id);
    const userEmail = user ? user.email : null;
    console.log('User Email', userEmail);

    if (!userToUpdate) {
      return Response.json({ error: 'User not found' });
    }

    if (!originalEmail || !email) {
      return Response.json({
        error: 'Both originalEmail and email are required for update',
      });
    }

    const data = { firstname, lastname, email, id };
    console.log('Updated data', data);

    const s3 = new S3Client({
      region: process.env.NEXT_PUBLIC_SECRET_AWS_REGION,
      endpoint: process.env.NEXT_PUBLIC_SECRET_AWS_ENDPOINT_URL_S3,
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_SECRET_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_SECRET_AWS_SECRET_ACCESS_KEY,
      },
    });

    console.log('Original email', originalEmail);
    console.log('New email', email);

    if (userEmail === originalEmail) {
      console.log('The emails are the same so its a match');

      const deleteCommand = new DeleteObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_SECRET_BUCKET_NAME,
        Key: originalEmail,
      });
      await s3.send(deleteCommand);
      const putCommand = new PutObjectCommand({
        Body: JSON.stringify(data),
        Bucket: process.env.NEXT_PUBLIC_SECRET_BUCKET_NAME,
        Key: email,
      });
      await s3.send(putCommand);

      return Response.json({ message: 'User updated successfully' });
    } else {
      console.log('Error: The emails do not match');
      return Response.json({ error: 'Failed to update user' });
    }
  } catch (e) {
    console.error(e);
  }
}
