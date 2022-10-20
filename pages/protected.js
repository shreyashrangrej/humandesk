import { supabase } from "../util/supabaseClient";

export default function Profile() {
    console.log({ user })

    return(
        <div style={{ maxWidth: '420px', margin: '96px auto' }}>
            <h2>
                Hello From Protected Route
            </h2>
        </div>
    )
}

export async function getServerSideProps({ req }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)

    if (!user) {
        return { props: {}, redirect: { destination: '/signin' } }
    }

    return { props: { user } }
}