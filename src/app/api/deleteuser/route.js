import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { fetchAllUsersFromS3, getUserById } from '../../helpers/getUsers';

export async function DELETE(req) {
  try {
    const id = await req.json();
    console.log('Id', id.id);
    const allUsers = await fetchAllUsersFromS3();
    console.log('all users', allUsers);
    const userToDelete = await getUserById(allUsers, id.id);
    console.log('user to delete', userToDelete);

    if (!userToDelete) {
      return Response.json({ error: 'User not found' });
    }

    const userEmail = userToDelete.email;

    const s3 = new S3Client({
      region: process.env.NEXT_PUBLIC_SECRET_AWS_REGION,
      endpoint: process.env.NEXT_PUBLIC_SECRET_AWS_ENDPOINT_URL_S3,
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_SECRET_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_SECRET_AWS_SECRET_ACCESS_KEY,
      },
    });

    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_SECRET_BUCKET_NAME,
      Key: userEmail,
    });

    await s3.send(deleteCommand);

    return Response.json({ message: 'User deleted successfully' });
  } catch (e) {
    console.error(e);
    return Response.json({ error: 'Failed to delete user' });
  }
}
