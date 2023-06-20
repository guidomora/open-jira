import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith("/api/entries/")) {
        const id = req.nextUrl.pathname.replace("/api/entries/", "")
        
        // Gist copiado de github de fernando
        const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");
        // esto evalua el id y si no hace match, retorna un error
        if (!checkMongoIDRegExp.test(id)) {
            const url = req.nextUrl.clone()
            url.pathname = "/api/bad-request"
            url.search = `?message=${id} is not a valid MongoID`
            return NextResponse.rewrite(url)
        }
    }
    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
//   matcher: '/about/:path*',

// podemos poner tantos paths como querramos
// para que detecte cuando usamos id
matcher:["/api/entries/:path/"]
}