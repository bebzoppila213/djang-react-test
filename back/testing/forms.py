from testing.models import Question
from django import forms


class QuestionForm(forms.ModelForm):
    class Meta:
        model = Question
        fields = ['title', 'answer_options', 'answer_options_true', 'test']

    def clean(self):

        for field_key in self.fields.keys():
            option = self.cleaned_data.get(field_key)
            if option is None:
                self.add_error(
                    field_key, f'Поле {field_key} не может быть пустым')

        answer_options = self.cleaned_data.get('answer_options')
        answer_options_true = self.cleaned_data.get('answer_options_true')
        if answer_options_true.count() >= answer_options.count():
            self.add_error('answer_options_true',
                           f'Выбрано слишком много правильных вариантов ответа')

        for answer_option_true in answer_options_true:
            if not answer_option_true in answer_options:
                self.add_error(
                    'answer_options_true', f'Правильный вариант должен быть включён в список всех вариантов')
        return self.cleaned_data
