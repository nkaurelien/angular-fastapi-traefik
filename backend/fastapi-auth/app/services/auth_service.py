from app.schemas.user import User


class AuthService:
    @staticmethod
    def verify_user(user: User) -> bool:
        # Replace with actual verification logic
        return user.username == "test" and user.password == "test"
