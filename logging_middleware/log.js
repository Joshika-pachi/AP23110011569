import dotenv from "dotenv";
dotenv.config();

const Log = async (stack, level, pkg, message) => {
  try {
    const res = await fetch("http://20.207.122.201/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message
      })
    });

    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error("Error:", err);
  }
};

export default Log;