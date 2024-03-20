import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from '@aws-sdk/client-s3';

export async function GET() {
  const streamToString = (stream) =>
    new Promise((resolve, reject) => {
      const chunks = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });

  try {
    const s3 = new S3Client({
      region: process.env.NEXT_PUBLIC_SECRET_AWS_REGION,
      endpoint: process.env.NEXT_PUBLIC_SECRET_AWS_ENDPOINT_URL_S3,
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_SECRET_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_SECRET_AWS_SECRET_ACCESS_KEY,
      },
    });
    const list = new ListObjectsV2Command({
      Bucket: process.env.NEXT_PUBLIC_SECRET_BUCKET_NAME,
      MaxKeys: 10,
    });
    const { Contents } = await s3.send(list);
    console.log('List Result', Contents);
    if (!Contents) {
      console.log('no users');
      return Response.json([]);
    } else {
      const users = await Promise.all(
        Contents.map(async (item) => {
          const getObject = new GetObjectCommand({
            Bucket: process.env.NEXT_PUBLIC_SECRET_BUCKET_NAME,
            Key: item.Key,
          });
          const { Body } = await s3.send(getObject);
          const data = await streamToString(Body);
          const userObject = JSON.parse(data);
          console.log('Data', data);
          return userObject;
        })
      );
      return Response.json(users);
    }
  } catch (e) {
    console.error(e);
    return Response.json([]);
  }
}
