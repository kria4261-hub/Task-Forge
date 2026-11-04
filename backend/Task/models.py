import uuid
from django.db import models

class mainModel(models.Model):
    id= models.UUIDField(primary_key= True,
        editable=False,
        default=uuid.uuid4
        )
    title=models.CharField(max_length=200)
    desc= models.TextField()
    stats= models.BooleanField(default= False)
    dedline= models.DateField()

    def __str__(self):
        return self.title


class projModel(models.Model):
    id= models.UUIDField(default= uuid.uuid4, primary_key=True, editable=False)
    title= models.CharField(max_length=200)
    task= models.JSONField(default=list)
    stats= models.BooleanField(default= False)
    dedline= models.DateField()

    def __str__(self):
        return self.title
