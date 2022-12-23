from django.db import models
from django.core.exceptions import ValidationError


class AnswerOption(models.Model):
    id = models.AutoField(auto_created=True, primary_key=True, serialize=True, verbose_name='ID')
    title = models.CharField(max_length=255, verbose_name="Текст ответа")

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = "Вариант ответа"
        verbose_name_plural = "Варианты ответа"


class Question(models.Model):
    id = models.AutoField(auto_created=True, primary_key=True, serialize=True, verbose_name='ID')
    title = models.CharField(max_length=255, verbose_name="Текст вопроса")
    answer_options = models.ManyToManyField(AnswerOption, related_name='answer_options', verbose_name="Все варинты ответа")
    answer_options_true = models.ManyToManyField(AnswerOption, related_name='answer_options_true', verbose_name="Правильные варинты ответа")
    test = models.ForeignKey('Test', on_delete=models.CASCADE)

    def __str__(self) -> str:
            return self.title
    
    class Meta:
        verbose_name = "Вопрос"
        verbose_name_plural = "Вопросы"

class Test(models.Model):
    id = models.AutoField(auto_created=True, primary_key=True, serialize=True, verbose_name='ID')
    title = models.CharField(max_length=255, verbose_name="Название теста")
    сategory = models.ForeignKey('CategoryTest', on_delete=models.DO_NOTHING,)

    class Meta:
        verbose_name = "Тест"
        verbose_name_plural = "Тесты"

    def __str__(self) -> str:
        return self.title

class CategoryTest(models.Model):
    id = models.AutoField(auto_created=True, primary_key=True, serialize=True, verbose_name='ID')
    title = models.CharField(max_length=255, verbose_name="Название категории")
    poster = models.ImageField(upload_to ='uploads/', null=True)

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

    def __str__(self) -> str:
        return self.title