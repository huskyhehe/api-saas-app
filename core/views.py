from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.views import APIView


class FileUploadView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        return Response({"test": True}, status=HTTP_200_OK)


class ChangeEmailView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        user = get_user_from_token(request)
        email_serializer = ChangeEmailSerializer(data=request.data)
        if email_serializer.is_valid():
            print(email_serializer.data)
            email = email_serializer.data.get('email')
            confirm_email = email_serializer.data.get('confirm_email')
            if email == confirm_email:
                user.email = email
                user.save()
                return Response({"email": email}, status=HTTP_200_OK)
            return Response({"message": "The emails did not match"}, status=HTTP_400_BAD_REQUEST)
        return Response({"message": "Did not receive the correct data"}, status=HTTP_400_BAD_REQUEST)
