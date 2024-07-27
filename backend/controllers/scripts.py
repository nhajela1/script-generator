from config.supabase import supabase

def get_user_scripts(user_id: str):
    """
    Fetch all scripts for a particular user from the scripts table.
    """
    response = supabase.table('scripts').select('*').eq('user_id', user_id).execute()
    return response.data

def add_new_script(user_id: str, script_text: str, title: str, genre: str):
    """
    Add a new script to the scripts table.
    """
    new_script = {
        'user_id': user_id,
        'script_text': script_text,
        'title': title,
        'genre': genre
    }
    response = supabase.table('scripts').insert(new_script).execute()
    return response.data
