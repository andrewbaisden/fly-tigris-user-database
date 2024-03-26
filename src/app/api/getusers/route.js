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

    const listParams = {
      Bucket: process.env.NEXT_PUBLIC_SECRET_BUCKET_NAME,
      MaxKeys: 10,
    };
    const list = new ListObjectsV2Command(listParams);
    const { Contents } = await s3.send(list);

    console.log('List Result', Contents);

    if (!Contents || Contents.length === 0) {
      console.log('No users found');
      return new Response(JSON.stringify({ error: 'No users found' }), {
        status: 404,
      });
    }

    const users = await Promise.all(
      Contents.map(async (item) => {
        const getObjectParams = {
          Bucket: process.env.NEXT_PUBLIC_SECRET_BUCKET_NAME,
          Key: item.Key,
        };
        const getObject = new GetObjectCommand(getObjectParams);
        const { Body } = await s3.send(getObject);
        const data = await streamToString(Body);
        console.log('Backend API GET Data:', data);
        return JSON.parse(data);
      })
    );

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (e) {
    console.error('Error:', e);
    return new Response(
      JSON.stringify({ error: e.message || 'Unknown error' }),
      { status: 500 }
    );
  }
}
