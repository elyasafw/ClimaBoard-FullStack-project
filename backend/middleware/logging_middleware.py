import time


async def log_requests(request, call_next):
    start_time = time.time()

    response = await call_next(request)

    duration_ms = round((time.time() - start_time) * 1000, 2)
    print(f"{request.method} {request.url.path} -> {response.status_code} ({duration_ms}ms)")

    return response
