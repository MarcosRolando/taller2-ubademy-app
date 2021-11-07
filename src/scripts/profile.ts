export default async function getCoursesData() {
  try {
    const response = await fetch(
        'https://reqres.in/api/unknown',
    );
    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error(error);
  } // TODO usar axios
}
