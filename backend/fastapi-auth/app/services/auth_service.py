from app.schemas.user import User


class AuthService:
    @staticmethod
    def verify_user(user: User) -> bool:
        # TODO Replace with actual verification logic
        return user.username == "sincere@april.biz" and user.password == "test"
