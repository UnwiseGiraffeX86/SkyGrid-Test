# import os
# import cv2
# import numpy as np

# data_directory = "dataset"
# categories = ["Audi", "no_car  "]
# img_size = 100

# training_data = []

# def create_training_data():
#     for category in categories:
#         path = os.path.join(data_directory, category)
#         class_num = categories.index(category)
#         for img in os.listdir(path):
#             try:
#                 img_array = cv2.imread(os.path.join(path, img), cv2.IMREAD_GRAYSCALE)
#                 new_array = cv2.resize(img_array, (img_size, img_size))
#                 training_data.append([new_array, class_num])
#             except Exception as e:
#                 pass

# create_training_data()

# import random
# random.shuffle(training_data)

# X = []
# y = []

# for features, label in training_data:
#     X.append(features)
#     y.append(label)

# X = np.array(X).reshape(-1, img_size, img_size, 1)
# y = np.array(y)