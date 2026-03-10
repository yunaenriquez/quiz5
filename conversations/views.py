import os
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from google import genai

client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY'))
MODEL_NAME = "gemini-2.5-flash-lite"

SYSTEM_PROMPT = """
You are an exper but friendly connoisseur that specializes in:
- Traditional and modern Kapampapangan cuisine

Your communication style:
- Use clear, beginner-friendly language and avoid unnecessary jargon.
- Use short analogies or real-world examples to clarify concepts.
- When explaining Kapampangan cuisines, explain each dish in an appetizing and inviting manner.
- Keep answers professional, focused, and concise - avoid overwhelming and confusing the i
- Be engaging: create a mouthwatering idea when describing and recommending Kapampangan dishes to the user.

Scope -- THIS IS A STRICT RULE, NO EXCEPTIONS:
- You ONLY make food recommendations about traditional and modern Kapampangan cuisine or local eateries in Pampanga.
- If the user asks about ANY other food that are not made in Pampanga, did not originate in Pampanga, and are not Kapampangan cuisine in general - you MUST REFUSE.
- When refusing, respond with EXACTLY this message and nothing else:
"I'm sorry! I'm only able to help with with Kapampangan cuisine. Please ask me something new."
- Do NOT provide a partial answer then refuse. Do NOT make exceptions for "related" or "similar" topics. REFUSE immediately and completely.
"""

@csrf_exempt
@require_http_methods(["POST"])
def chat_view(request):
    """Handle a chat request from the frontend.

    Expected request body (JSON):
    {
        "message": "Hello, what is Python?"
    }

    Returns (JSON):
    {
        "reply": "Python is a popular programming language ..."
    }
    or 
    {
        "error": "I'm sorry! I'm only able to help with Python, Django, JavaScript, and React. Please ask me something new."
    }
    """

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON in request body."}, status=400)

    user_message = data.get("message", "").strip()
    if not user_message:
        return JsonResponse({"error": "Message cannot be empty."}, status=400)

    try:
        # Prepend system prompt to user message
        full_message = f"{SYSTEM_PROMPT}\n\nUser question: {user_message}"
        
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=full_message,
        )

        ai_reply = response.text
    
    except Exception as e:
        error_msg = str(e)
        print(f"Error calling Gemini API: {error_msg}")
        print(f"API Key present: {bool(os.environ.get('GEMINI_API_KEY'))}")
        return JsonResponse({"error": f"Failed to get response from AI model: {error_msg}"}, status=500)

    return JsonResponse({"reply": ai_reply})

