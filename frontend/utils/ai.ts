export const fetchCoverLetter = async (message: string, profile: object) => {
  const input = {
    message: message,
    profile: profile,
  };

  try {
    const response = await fetch('http://localhost:8080/api/cover-letter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log('trying to get user data');
    const data = await response.text();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching cover letter:', error);
  }
};
