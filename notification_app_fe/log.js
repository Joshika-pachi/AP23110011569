const Log = async (stack, level, pkg, message) => {
  try {
    await fetch("http://20.207.122.201/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJqb3NoaWthX3BhY2hpZ3VsbGFAc3JtYXAuZWR1LmluIiwiZXhwIjoxNzc3NzA2NjU3LCJpYXQiOjE3Nzc3MDU3NTcsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIxN2U5NjU3NS1hYTVkLTQ0OTAtYTE1MS1lMzg3ZTU3Y2Y0MzYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJqb3NoaWthIiwic3ViIjoiMWViNzZhOWQtYTZkMy00OWUxLWE4YWEtMTNlNGQxYTVhNWYwIn0sImVtYWlsIjoiam9zaGlrYV9wYWNoaWd1bGxhQHNybWFwLmVkdS5pbiIsIm5hbWUiOiJqb3NoaWthIiwicm9sbE5vIjoiYXAyMzExMDAxMTU2OSIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6IjFlYjc2YTlkLWE2ZDMtNDllMS1hOGFhLTEzZTRkMWE1YTVmMCIsImNsaWVudFNlY3JldCI6InZzRFBYWnBKS1VqenNWYlQifQ.14x3kCaIV8CdFknRSVFxaT3h7A6hzKbmzanJRhHFyLQ"
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