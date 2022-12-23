from django.contrib import admin
from testing.models import AnswerOption, Question, CategoryTest, Test
from testing.forms import QuestionForm


class QuestionAdmin(admin.ModelAdmin):
    form = QuestionForm

admin.site.register(Test)
admin.site.register(CategoryTest)
admin.site.register(AnswerOption)
admin.site.register(Question, QuestionAdmin)
# admin.site.register(QuestionOnAnswerOption)
# Register your models here.
