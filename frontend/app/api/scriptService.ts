export async function generateScript(params: {
    title: string;
    description: string;
    genre: string;
    clipLength: string;
    specificMoments: string;
  }) {
    const response = await fetch('/api/generate_script', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parameters: [
          params.genre,
          params.title,
          params.description,
          params.clipLength,
        ],
      }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to generate script');
    }
  
    return response.json();
  }