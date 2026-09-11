"""Initial BB610 WATER Admin persistence schema.

Revision ID: 0001
Revises:
Create Date: 2026-09-11
"""

from alembic import op
import sqlalchemy as sa

revision = "0001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "admin_users",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("email", sa.String(length=320), nullable=False),
        sa.Column("password_hash", sa.String(length=512), nullable=False),
        sa.Column("role", sa.String(length=32), nullable=False),
        sa.Column("active", sa.Boolean(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.UniqueConstraint("email", name="uq_admin_users_email"),
    )
    op.create_index("ix_admin_users_email", "admin_users", ["email"], unique=True)

    op.create_table(
        "catalog_versions",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("version", sa.Integer(), nullable=False),
        sa.Column("parent_version", sa.Integer(), nullable=True),
        sa.Column("snapshot", sa.JSON(), nullable=False),
        sa.Column("checksum", sa.String(length=64), nullable=False),
        sa.Column("created_by", sa.String(length=320), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("note", sa.Text(), nullable=False),
        sa.UniqueConstraint("version", name="uq_catalog_versions_version"),
    )
    op.create_index("ix_catalog_versions_version", "catalog_versions", ["version"], unique=True)

    op.create_table(
        "catalog_publications",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("version", sa.Integer(), nullable=False),
        sa.Column("published_by", sa.String(length=320), nullable=False),
        sa.Column("published_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index("ix_catalog_publications_version", "catalog_publications", ["version"], unique=False)

    op.create_table(
        "catalog_audit_events",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("event_type", sa.String(length=64), nullable=False),
        sa.Column("actor", sa.String(length=320), nullable=False),
        sa.Column("version", sa.Integer(), nullable=True),
        sa.Column("payload", sa.JSON(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index("ix_catalog_audit_events_event_type", "catalog_audit_events", ["event_type"], unique=False)
    op.create_index("ix_catalog_audit_events_actor", "catalog_audit_events", ["actor"], unique=False)
    op.create_index("ix_catalog_audit_events_version", "catalog_audit_events", ["version"], unique=False)
    op.create_index("ix_catalog_audit_events_created_at", "catalog_audit_events", ["created_at"], unique=False)


def downgrade():
    op.drop_index("ix_catalog_audit_events_created_at", table_name="catalog_audit_events")
    op.drop_index("ix_catalog_audit_events_version", table_name="catalog_audit_events")
    op.drop_index("ix_catalog_audit_events_actor", table_name="catalog_audit_events")
    op.drop_index("ix_catalog_audit_events_event_type", table_name="catalog_audit_events")
    op.drop_table("catalog_audit_events")
    op.drop_index("ix_catalog_publications_version", table_name="catalog_publications")
    op.drop_table("catalog_publications")
    op.drop_index("ix_catalog_versions_version", table_name="catalog_versions")
    op.drop_table("catalog_versions")
    op.drop_index("ix_admin_users_email", table_name="admin_users")
    op.drop_table("admin_users")
