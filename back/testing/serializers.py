from rest_framework import serializers

from .models import CategoryTest, Test, Question

class CategorySerializer(serializers.ModelSerializer):
    # tests = serializers.PrimaryKeyRelatedField(queryset=Test.objects.all(), many=True)

    class Meta:
        model = CategoryTest
        fields = ('title', 'id', 'poster')

class TestSerializer(serializers.ModelSerializer):

    сategory = CategorySerializer()

    class Meta:
        model = Test
        fields = ('id', 'title', 'сategory')


class AnswerOptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = ('id', 'title',)

class QuestionSerializer(serializers.ModelSerializer):

    answer_options = AnswerOptionSerializer(many=True)
    answer_options_true = AnswerOptionSerializer(many=True)

    class Meta:
        model = Question
        fields = ('id', 'title', 'answer_options', 'answer_options_true',)