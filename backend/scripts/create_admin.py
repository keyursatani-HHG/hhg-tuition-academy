"""Create (or report) the first admin user.

Usage:
    python -m scripts.create_admin --email admin@gmail.com --name "Administrator" \
        --password "admin@123" --superadmin

Idempotent: if an admin with the given email already exists, it is left unchanged.
"""

import argparse
import asyncio

from app.core.database import AsyncSessionLocal
from app.repositories.admin_repository import AdminRepository
from app.services.auth_service import AuthService


async def _run(email: str, name: str, password: str, superadmin: bool) -> None:
    async with AsyncSessionLocal() as session:
        repo = AdminRepository(session)
        existing = await repo.get_by_email(email)
        if existing is not None:
            print(f"Admin already exists: {existing.email} (id={existing.id}) — no change.")
            return

        admin = await AuthService(session).create_admin(
            email=email,
            full_name=name,
            password=password,
            is_superadmin=superadmin,
        )
        print(f"Created admin: {admin.email} (id={admin.id}, superadmin={admin.is_superadmin})")


def main() -> None:
    parser = argparse.ArgumentParser(description="Create the first admin user.")
    parser.add_argument("--email", required=True)
    parser.add_argument("--name", default="Administrator")
    parser.add_argument("--password", required=True)
    parser.add_argument("--superadmin", action="store_true")
    args = parser.parse_args()

    asyncio.run(_run(args.email, args.name, args.password, args.superadmin))


if __name__ == "__main__":
    main()
