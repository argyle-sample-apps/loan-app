export const getAuthOpts = () => {
  const authString =
    process.env.ARGYLE_API_KEY + ":" + process.env.ARGYLE_API_SECRET;

  const authToken = Buffer.from(authString).toString("base64");

  const options = {
    headers: {
      Authorization: "Basic " + authToken,
      "Content-Type": "application/json",
    },
  };
  return options;
};
