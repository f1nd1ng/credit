# Generated by Django 5.1.6 on 2025-03-22 08:40

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Transaction",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("amount", models.DecimalField(decimal_places=2, max_digits=10)),
                (
                    "transaction_type",
                    models.CharField(
                        choices=[("income", "Income"), ("expense", "Expense")],
                        max_length=7,
                    ),
                ),
                ("category", models.CharField(max_length=100)),
                ("date", models.DateField()),
                ("description", models.TextField(blank=True, null=True)),
                (
                    "currency",
                    models.CharField(
                        choices=[
                            ("INR", "Indian Rupee"),
                            ("USD", "US Dollar"),
                            ("EUR", "Euro"),
                            ("GBP", "British Pound"),
                            ("JPY", "Japanese Yen"),
                            ("AUD", "Australian Dollar"),
                            ("CAD", "Canadian Dollar"),
                            ("CNY", "Chinese Yuan"),
                            ("SGD", "Singapore Dollar"),
                        ],
                        default="INR",
                        max_length=10,
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
