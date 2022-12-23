from django.contrib import admin
from django.urls import path, include

from testing.views import CategoryApiView, TestsApiView, QuestionApiView

urlpatterns = [
    path("api/v1/category", CategoryApiView.as_view()),
    path("api/v1/tests", TestsApiView.as_view()),
    path("api/v1/questions", QuestionApiView.as_view()),
]