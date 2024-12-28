import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";

const AddMeetupPage = () => {
  const router = useRouter();
  const handleAddMeetup = async (newMeetup) => {
    try {
      const response = await fetch("/api/new-meetup", {
        method: "POST",
        body: JSON.stringify(newMeetup),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Erorr while adding");
      }
      const data = await response.json();
      console.log(data);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Head>
        <title>Add New Meetup</title>
        <meta
          name="description"
          content="Add new Meetup place and build your community"
        />
      </Head>
      <NewMeetupForm onAddMeetup={handleAddMeetup} />
    </>
  );
};

export default AddMeetupPage;
