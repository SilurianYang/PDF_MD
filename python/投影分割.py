import cv2 as cv
import numpy as np
from matplotlib import pyplot as plt, cm


def show_img(img):
    plt.imshow(img)
    plt.show()


def show_gray_img(img):
    plt.imshow(img, cmap=cm.gray)
    plt.show()


def count_number(num_list, num):
    """
    统计一维数组中某个数字的个数
    :param num_list:
    :param num:
    :return: num的数量
    """
    t = 0
    for i in num_list:
        if i == num:
            t += 1
    return t


def cut_level(img, cvalue=255):
    """
    投影法水平切割一张图片 主要处理多行文本
    :param cvalue:  切割线的颜色
    :param img: 传入为一张图片
    :return: 水平切割之后的图片数组
    """
    r_list = []
    end = 0
    for i in range(len(img)):
        if count_number(img[i], cvalue) >= img.shape[1]:
            star = end
            end = i
            if end - star > 1:
                # 如果相差值大于一的时候就说明跨过待切割的区域，
                # 根据 star 和end 的值就可以获取区域
                r_list.append(img[star:end, :])
    return r_list


def cut_vertical(img_list, cvalue=255):
    """
    投影法竖直切割图片的数组
    :param img_list: 传入的数据为一个由（二维）图片构成的数组，不是单纯的图片
    :param cvalue: 切割的值 同cut_level中的cvalue
    :return: 切割之后的图片的数组
    """
    # 如果传入的是一个普通的二值化的图片，则需要首先将这个二值化的图片升维为图片的数组
    if len(np.array(img_list).shape) == 2:
        img_list = img_list[None]
    r_list = []
    for img_i in img_list:
        end = 0
        for i in range(len(img_i.T)):
            if count_number(img_i.T[i], cvalue) >= img_i.shape[0]:
                star = end
                end = i
                if end - star > 1:
                    r_list.append(img_i[:, star:end])
    return r_list


def cut_image_by_projection(img, cvalue=255, patern=2):
    """
    传入二值化处理之后的图片 通过投影切割获取每个单独的数字
    处理方法默认为先水平切割再竖直切割
    :param cvalue: 根据切个数值，默认为255（根据白色切割），可选择0（根据黑色切割）
    :param img:传入的二值化图片
    :param patern: 2 为水平竖直两次切割，0 为水平切割， 1 为竖直切割
    :return: 返回切割完成后的图片数组
    """
    if patern == 2:
        return cut_vertical(cut_level(img, cvalue=cvalue), cvalue=cvalue)
    elif patern == 1:
        return cut_vertical(img, cvalue=cvalue)
    else:
        return cut_level(img, cvalue=cvalue)


img = cv.imread('./160550602121615.jpg')
img_gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)  # 函数的返回值为转换之后的图像
ret, th1 = cv.threshold(img_gray, 127,255, cv.THRESH_BINARY)

# cv.imshow('gray2',th1)
# cv.waitKey(0)

# 二值化处理之后的图片只有 0 和 255  0为黑 255 为白
img_list = cut_image_by_projection(th1,0)
t = 1
for i in img_list:
    # 这里可以对切割到的图片进行操作，显示出来或者保存下来
    cv.imwrite(str(t) + '.jpg', i)
    #show_gray_img(i)
    t += 1
