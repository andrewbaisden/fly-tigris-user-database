import { fetchAllUsersFromS3, getUserByIdEmail } from '../../helpers/getUsers';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export async function POST(req) {
  try {
    const { firstname, lastname, email, password } = await req.json();

    const id = crypto.randomUUID();
    const data = { firstname, lastname, email, password, id };

    console.log('Request body data', data);
    const allUsers = await fetchAllUsersFromS3();
    console.log('all users', allUsers);
    const existingUser = await getUserByIdEmail(allUsers, email);
    console.log(existingUser, email);
    if (existingUser) {
      return Response.json({
        error: 'Email address already in use',
      });
    }

    const s3 = new S3Client({
      region: process.env.NEXT_PUBLIC_SECRET_AWS_REGION,
      endpoint: process.env.NEXT_PUBLIC_SECRET_AWS_ENDPOINT_URL_S3,
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_SECRET_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_SECRET_AWS_SECRET_ACCESS_KEY,
      },
    });

    const commandDetails = new PutObjectCommand({
      Body: JSON.stringify(data),
      Bucket: process.env.NEXT_PUBLIC_SECRET_BUCKET_NAME,
      Key: email,
    });

    await s3.send(commandDetails);
    return Response.json({ message: 'User added' });
  } catch (e) {
    console.error(e);
    return Response.json({ error: 'Failed to create user' });
  }
}
