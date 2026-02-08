import users.views
from re import error
from django.http import HttpResponse
from django.shortcuts import render
from .models import users

def Login(request):
    if request.method == 'POST':
        email = request.POST.get('username')
        password = request.POST.get('password')
        try:
            user = users.objects.get(email=email, password=password)
            print("login")
            return render(request, 'dashboard.html', {'user': user})
        except users.DoesNotExist:
            return render(request, 'login.html')
    return render(request, 'login.html')

def signup(request):
    if request.method == 'POST':
        new_user = users(
            username = request.POST.get('full-name'),
            full_name = request.POST.get('full-name'),
            email = request.POST.get('email'),
            role = request.POST.get('role'),
            experience = request.POST.get('experience'),
            targeted_companies = request.POST.get('target-company'),
            password = request.POST.get('password')
        )
        new_user.save()
        return render(request, 'login.html')
    return render(request, 'signup.html')


class dashboard():
    def dashboard(self, request):
        return render(request, 'dashboard.html')


