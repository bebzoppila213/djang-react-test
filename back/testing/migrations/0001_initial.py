# Generated by Django 4.1.4 on 2022-12-22 02:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="AnswerOption",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "title",
                    models.CharField(max_length=255, verbose_name="Текст ответа"),
                ),
            ],
            options={
                "verbose_name": "Вариант ответа",
                "verbose_name_plural": "Варианты ответа",
            },
        ),
        migrations.CreateModel(
            name="CategoryTest",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "title",
                    models.CharField(max_length=255, verbose_name="Название категории"),
                ),
            ],
            options={"verbose_name": "Категория", "verbose_name_plural": "Категории",},
        ),
        migrations.CreateModel(
            name="Test",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "title",
                    models.CharField(max_length=255, verbose_name="Название теста"),
                ),
                (
                    "сategory",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="testing.categorytest",
                    ),
                ),
            ],
            options={"verbose_name": "Тест", "verbose_name_plural": "Тесты",},
        ),
        migrations.CreateModel(
            name="Question",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "title",
                    models.CharField(max_length=255, verbose_name="Текст вопроса"),
                ),
                (
                    "answer_options",
                    models.ManyToManyField(
                        related_name="answer_options",
                        to="testing.answeroption",
                        verbose_name="Все варинты ответа",
                    ),
                ),
                (
                    "answer_options_true",
                    models.ManyToManyField(
                        related_name="answer_options_true",
                        to="testing.answeroption",
                        verbose_name="Правильные варинты ответа",
                    ),
                ),
                (
                    "test",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="testing.test"
                    ),
                ),
            ],
            options={"verbose_name": "Вопрос", "verbose_name_plural": "Вопросы",},
        ),
    ]