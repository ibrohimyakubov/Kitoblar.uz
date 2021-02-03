from django.contrib.auth.models import User
from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField
# Create your models here.
from django.forms import ModelForm, TextInput, Textarea
from django.urls import reverse
from django.utils.safestring import mark_safe
from mptt.fields import TreeForeignKey
from mptt.models import MPTTModel


class Category(MPTTModel):
    STATUS = (
        ('True', 'Mavjud'),
        ('False', 'Mavjud emas'),
    )
    parent = TreeForeignKey('self', blank=True, null=True, related_name='children', on_delete=models.CASCADE)
    title = models.CharField(max_length=222,unique=True)
    keywords = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(null=False, unique=True)
    description = models.CharField(max_length=255,blank=True)
    image = models.ImageField(upload_to='images/',blank=True)
    status = models.CharField(max_length=10, choices=STATUS)

    create_at=models.DateTimeField(auto_now_add=True)
    update_at=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class MPTTMeta:
        order_insertion_by = ['title']

    def get_absolute_url(self):
        return reverse('category_detail', kwargs={'slug':self.slug})

    def __str__(self):
        full_path = [self.title]
        k = self.parent
        while k is not None:
            full_path.append(k.title)
            k=k.parent
        return '/'.join(full_path[::-1])



class Product(models.Model):
    STATUS = (
        ('True', 'Mavjud'),
        ('False', 'Mavjud emas'),
    )
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=222,unique=True)
    keywords = models.CharField(max_length=222, unique=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='images/', blank=True)
    price = models.FloatField()
    amount = models.IntegerField()
    minamount = models.IntegerField()
    detail=RichTextUploadingField()
    slug = models.SlugField(null=False, unique=True)
    status = models.CharField(max_length=10,choices=STATUS)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    class Meta:
       # ordering = ('name',)
        verbose_name = 'product'
        verbose_name_plural = 'products'

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('category_detail', kwargs={'slug': self.slug})

    def image_tag(self):
        return mark_safe('<img src="{}" height="50"/>'.format(self.image.url))
    image_tag.short_description='Image'


class Images(models.Model):
    product=models.ForeignKey(Product, on_delete=models.CASCADE)
    title=models.CharField(max_length=50, blank=True)
    image=models.ImageField(blank=True, upload_to='images/')

    def __str__(self):
        return self.title


class Comment(models.Model):
    STATUS = (
        ('True', 'Mavjud'),
        ('False', 'Mavjud emas'),
    )
    product=models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subject = models.CharField(max_length=55, blank=True)
    comment=models.CharField(max_length=255, blank=True)
    rate = models.IntegerField(default=1)
    ip = models.CharField(max_length=20, blank=True)
    status = models.CharField(max_length=10,choices=STATUS, default='True')
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.subject

class CommentForm(ModelForm):
    class Meta:
        model = Comment
        fields = ['subject', 'comment', 'rate']