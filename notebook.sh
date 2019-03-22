#!/bin/bash
mkdir -p ~/.jupyter/
echo "c.NotebookApp.token = u''" >> ~/.jupyter/jupyter_notebook_config.py
jupyter notebook --no-browser --ip="*" &

