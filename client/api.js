import axios from "axios";

export default function getTheName(id) {
  const getName = async (id) => {
    try {
      let { data } = await axios.get(`/api/groups/name/${id}`);
      console.log(data.name);
      return data.name;
    } catch (error) {
      console.log(error);
    }
  };
  return getName(id);
}
