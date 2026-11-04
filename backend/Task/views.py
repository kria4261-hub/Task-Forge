from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from . models import mainModel, projModel
from . serializers import TaskSerializer, ProjectSerializer
from rest_framework import status

class ListTask(APIView):

    def get(self, request):
        task=mainModel.objects.all()
        serializer= TaskSerializer(task, many=True)
        return Response(serializer.data)
    
    def post(self,request):
        serializer=TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DetailTask(APIView):

    def get(self,request,pk):
        task= get_object_or_404(mainModel, pk=pk)
        serializer= TaskSerializer(task)
        return Response(serializer.data)

    def put (self, request, pk):
        tsk= get_object_or_404(mainModel, pk=pk)
        serializer= TaskSerializer(tsk, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch (self, request, pk):
        tsk= get_object_or_404(mainModel, pk=pk)
        serializer= TaskSerializer(tsk, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        tsk= get_object_or_404(mainModel, pk=pk)
        tsk.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class projectList(APIView):
    def get(self, request):
        prj= projModel.objects.all()
        serializer= ProjectSerializer(prj,many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer= ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class projectDetail(APIView):
    def get(self, request, pk):
        prj= get_object_or_404(projModel, pk=pk)
        serializer=ProjectSerializer(prj)
        return Response(serializer.data)

    def patch(self, request, pk):
        prj=get_object_or_404(projModel, pk=pk)
        serializer= ProjectSerializer(prj, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        prj= get_object_or_404(projModel, pk=pk)
        prj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)