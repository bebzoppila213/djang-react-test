from rest_framework.views import APIView
from rest_framework.response import Response
from testing.models import CategoryTest, Test, Question
from testing.serializers import TestSerializer, CategorySerializer, QuestionSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

class CategoryApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        all_categories = CategoryTest.objects.all()
        return Response(CategorySerializer(all_categories, many=True).data)


class TestsApiView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        params = {
            'title': '',
            'сategory': None,
            'take': 10,
            'skip': 0
        }
        
        for key in params.keys():
            params[key] = request.GET.get(key, params[key])

        if params['сategory'] is None:
            return Response([])

        all_tests = Test.objects.filter(title__contains=params['title'])
        all_tests = all_tests.filter(сategory=params['сategory'])
        all_tests = all_tests[params['skip']:params['take']]

        return Response(TestSerializer(all_tests, many=True).data)


class QuestionApiView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        test_id = request.GET.get("test", -1)
        questions = Question.objects.filter(test=test_id)
        return Response(QuestionSerializer(questions, many=True).data)