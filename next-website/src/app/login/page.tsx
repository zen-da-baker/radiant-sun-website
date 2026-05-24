// Import components
import { LoginForm } from "@/page-components/admin/LoginForm";

// Import helper functions
import { handleUsernameSubmission } from "@/helpers/login-server-functions/handleUsernameSubmission";
import { handleAnswerSubmission } from "@/helpers/login-server-functions/handleAnswerSubmission";

export default function Login() {

    return (
        <main>

            <h1>Login</h1>

            <LoginForm 
                handleUsernameSubmission={ handleUsernameSubmission } 
                handleAnswerSubmission={ handleAnswerSubmission }
            />

        </main>
    )
}