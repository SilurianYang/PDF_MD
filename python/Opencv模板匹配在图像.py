import cv2 as cv

# 1.模板匹配
img = cv.imread('AABBC.jpg', 0)
methods=['cv.TM_SQDIFF_NORMED']
XYINFO={
    '.':[54,62],
    '4':[99,140],
    '5':[176,206],
    '6':[246,282],
    '7':[318,355],
    '0':[392,424],
    '8':[462,498],
    '9':[534,570],
    '3':[606,641],
    '2':[677,713],
    '1':[750,772],
    ',':[810,822]
}

def output_image_key(template):
    h, w = template.shape[:2]  # rows->h, cols->w
    for meth in methods:
        img2 = img.copy()

        # 匹配方法的真值
        method = eval(meth)
        res = cv.matchTemplate(img, template, method)
        min_val, max_val, min_loc, max_loc = cv.minMaxLoc(res)

        # 如果是平方差匹配TM_SQDIFF或归一化平方差匹配TM_SQDIFF_NORMED，取最小值
        if method in [cv.TM_SQDIFF, cv.TM_SQDIFF_NORMED]:
            top_left = min_loc
        else:
            top_left = max_loc
        bottom_right = (top_left[0] + w, top_left[1] + h)

        x1=top_left[0]
        y1=bottom_right[0]

        for k in XYINFO.keys():
            v1=XYINFO[k][0]
            v2=XYINFO[k][1]
            if v1<x1 and v2>y1:
                return k
        return ''

print(output_image_key(cv.imread('11.jpg',0)))


# import cv2 as cv
# import numpy as np
# from matplotlib import pyplot as plt

# # 1.模板匹配
# img = cv.imread('lena.jpg', 0)
# template = cv.imread('face.jpg', 0)
# h, w = template.shape[:2]  # rows->h, cols->w

# # 6种匹配方法
# methods = ['cv.TM_CCOEFF', 'cv.TM_CCOEFF_NORMED', 'cv.TM_CCORR',
#            'cv.TM_CCORR_NORMED', 'cv.TM_SQDIFF', 'cv.TM_SQDIFF_NORMED']

# for meth in methods:
#     img2 = img.copy()

#     # 匹配方法的真值
#     method = eval(meth)
#     res = cv.matchTemplate(img, template, method)
#     min_val, max_val, min_loc, max_loc = cv.minMaxLoc(res)

#     # 如果是平方差匹配TM_SQDIFF或归一化平方差匹配TM_SQDIFF_NORMED，取最小值
#     if method in [cv.TM_SQDIFF, cv.TM_SQDIFF_NORMED]:
#         top_left = min_loc
#     else:
#         top_left = max_loc
#     bottom_right = (top_left[0] + w, top_left[1] + h)

#     # 画矩形
#     cv.rectangle(img2, top_left, bottom_right, 255, 2)

#     plt.subplot(121), plt.imshow(res, cmap='gray')
#     plt.xticks([]), plt.yticks([])  # 隐藏坐标轴
#     plt.subplot(122), plt.imshow(img2, cmap='gray')
#     plt.xticks([]), plt.yticks([])
#     plt.suptitle(meth)
#     plt.show()