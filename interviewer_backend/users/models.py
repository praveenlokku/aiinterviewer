from django.db import models



class users(models.Model):
    username = models.CharField(max_length=50)
    full_name = models.CharField(max_length= 150)
    email = models.EmailField(unique= True)
    role = models.CharField(blank = True)
    experience = models.CharField(blank = True)
    targeted_companies = models.CharField(max_length = 150)
    password = models.CharField(max_length = 50)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True)

    date_joined = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)