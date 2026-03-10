from django.contrib import admin
from django.urls import path
from conversations.views import chat_view

urlpatterns = [
    path('chat/', chat_view, name='chat'),
]