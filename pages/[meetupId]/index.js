import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

const MeetupDetails = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail meetupData={props.meetupData} />
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://abhicodeworld:abhicodeworld@cluster0.mnr2x.mongodb.net/?retryWrites=true&w=majority&appName=meetups"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetupsId = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetupsId.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://abhicodeworld:abhicodeworld@cluster0.mnr2x.mongodb.net/?retryWrites=true&w=majority&appName=meetups"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetupData = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  console.log(meetupData);
  client.close();

  return {
    props: {
      meetupData: {
        id: meetupData._id.toString(),
        title: meetupData.title,
        description: meetupData.description,
        image: meetupData.image,
        address: meetupData.address,
      },
    },
    revalidate: 10,
  };
}

export default MeetupDetails;
