<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminPristup
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $userId = auth()->user()->id;

        $user = User::find($userId);

        if (!$user) {
            return response()->json(['message' => 'Ne postoji korisnik'], 403);
        }

        if ($user->uloga !== 'admin') {
            return response()->json(['message' => 'Nemate pristup'], 403);
        }

        return $next($request);
    }
}
