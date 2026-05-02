const Log = async (stack, level, pkg, message) => {
  try {
    await fetch("http://20.207.122.201/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJqb3NoaWthX3BhY2hpZ3VsbGFAc3JtYXAuZWR1LmluIiwiZXhwIjoxNzc3NzAxMzkxLCJpYXQiOjE3Nzc3MDA0OTEsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJkM2VhOGEzNy1lNTE4LTRkMzYtODRjMC1mNzA3NTg2NWQ0ZWIiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJqb3NoaWthIiwic3ViIjoiMWViNzZhOWQtYTZkMy00OWUxLWE4YWEtMTNlNGQxYTVhNWYwIn0sImVtYWlsIjoiam9zaGlrYV9wYWNoaWd1bGxhQHNybWFwLmVkdS5pbiIsIm5hbWUiOiJqb3NoaWthIiwicm9sbE5vIjoiYXAyMzExMDAxMTU2OSIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6IjFlYjc2YTlkLWE2ZDMtNDllMS1hOGFhLTEzZTRkMWE1YTVmMCIsImNsaWVudFNlY3JldCI6InZzRFBYWnBKS1VqenNWYlQifQ.GPy95vqh0ueYiI-oHM1V4q47XS_bR1iznPfHuoVKXVw"
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message
      })
    });
  } catch (err) {
    console.error("Log failed", err);
  }
};

export default Log;