from users import views
from django.urls import path


urlpatterns = [
    path('login/', views.Login, name='Login'),
    path('signup/', views.signup, name='Signup'),
    path('pk.id/', views.dashboard, name='Dashboard'),
    
]