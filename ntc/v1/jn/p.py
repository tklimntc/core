import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
sns.set_style('whitegrid')
dat = pd.read_csv('d.csv')
dat.head()
plt.plot(dat.time, dat.temp)
plt.show()
