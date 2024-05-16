import axios from "axios";
jest.mock("axios");

const fetchData = async () => {
  const response = await axios.get("http://localhost:4000");
  return response.data;
};

describe("fetchData", () => {
  it("fetches successfully data from an API", async () => {
    const data = { data: "test" };

    const test = await fetchData();
    console.log("test", test);

    await expect(fetchData()).resolves.toEqual("test");

    expect(axios.get).toHaveBeenCalledWith("https://api.example.com/data");
  });
});
