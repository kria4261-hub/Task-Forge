from rest_framework import serializers
from . models import mainModel, projModel

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model= mainModel
        fields=["id", "title","desc","stats","dedline"]

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model=projModel
        fields= ['id','title','task','stats','dedline']