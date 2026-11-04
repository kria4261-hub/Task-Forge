from django.urls import path
from .views import ListTask, DetailTask,projectDetail, projectList

urlpatterns=[
    path('', ListTask.as_view(), name='task-list'),
    path('task/<uuid:pk>', DetailTask.as_view(), name='detail-view'),
    path('project', projectList.as_view(), name='project-list'),
    path('project/<uuid:pk>', projectDetail.as_view(), name='project-detail'),
]