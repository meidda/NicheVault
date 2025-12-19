import { withAuth } from "next-auth/middleware"

export default withAuth(
    function proxy() {
        // Custom logic if needed
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                if (req.nextUrl.pathname.startsWith('/admin')) {
                    return token?.isAdmin === true;
                }
                return true;
            },
        },
    }
)

export const config = { matcher: ["/admin/:path*"] }
