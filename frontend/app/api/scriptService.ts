export async function generateScript(params: {
    title: string;
    description: string;
    genre: string;
    clipLength: string;
    specificMoments: string;
  }, userId: string) {
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
        user_id: userId
      }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to generate script');
    }
  
    return response.json();
}

export async function getGeneratedScripts(userId: string) {
  if (!userId) return

  const response = await fetch(`/api/scripts?user_id=${userId}`);
  if (!response.ok) {
    throw new Error('Error while getting scripts');
  }

  const data = await response.json();
  return data.scripts
}

export async function getScriptDetails(scriptId: string) {
  if (!scriptId) return

  const response = await fetch(`/api/scripts/details?script_id=${scriptId}`);
  if (!response.ok) {
    throw new Error('Error while getting script details');
  }

  return response.json();
}