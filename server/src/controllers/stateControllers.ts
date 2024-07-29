import { Request, Response } from 'express';
import State from '../models/state';

export const createState = async (req: Request, res: Response) => {
  try {
    const state = new State({ ...req.body, createdBy: req.user?.id });
    await state.save();
    res.status(201).json(state);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getStates = async (req: Request, res: Response) => {
  try {
    const states = await State.find();
    res.status(200).json(states);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateState = async (req: Request, res: Response) => {
  try {
    const state = await State.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }
    res.status(200).json(state);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteState = async (req: Request, res: Response) => {
  try {
    const state = await State.findByIdAndDelete(req.params.id);
    if (!state) {
      return res.status(404).json({ message: 'State not found' });
    }
    res.status(200).json({ message: 'State deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
