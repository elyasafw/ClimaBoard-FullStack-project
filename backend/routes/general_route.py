from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse

router = APIRouter()


@router.get("/health")
def get_health():
    return JSONResponse(content={"message": "Server running successfully"})


@router.get("/atbash")
def atbash(text: str):
    try:
        text = text.lower()
        english_letters = "abcdefghijklmnopqrstuvwxyz"
        hebrew_letters = "אבגדהוזחטיכלמנסעפצקרשת"
        final_letters = {"ך": "כ", "ם": "מ", "ן": "נ", "ף": "פ", "ץ": "צ"}

        if text[0] in english_letters:
            current_lang = english_letters
        else:
            current_lang = hebrew_letters
            for l in final_letters:
                text = text.replace(l, final_letters[l])

        result = ""

        for letter in text:
            index = current_lang.index(letter)
            result += current_lang[-(index + 1)]

        return JSONResponse({"message": result})
    except ValueError:
        raise HTTPException(
            status_code=400, detail={"error": "letter not in current language"}
        )
