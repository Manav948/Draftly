"use client"
import React from 'react'
import { Edge } from "reactflow"
import { edgeOptionSchema, EdgeOptionSchema } from '@/schema/edgeOptionsSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Select, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { SelectContent } from '@radix-ui/react-select'

interface Props {
    clickedEdge: Edge | null,
    isOpen: boolean,
    onSave: (data: EdgeOptionSchema) => void,
    onDeleteLabel: (edgeId: string) => void
}


const EdgeOptions = ({ clickedEdge, isOpen, onDeleteLabel, onSave }: Props) => {
    const form = useForm<EdgeOptionSchema>({
        resolver: zodResolver(edgeOptionSchema),
        defaultValues: {
            edgeId: "",
            label: "",
            type: "customBaizar",
            animate: false
        }
    })
    return (
        <SheetContent className='md:w-[26rem] md:max-w-md'>
            <SheetHeader>
                <SheetTitle>Edge Settings</SheetTitle>
                <SheetDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic autem quisquam, totam beatae, nostrum ab laudantium voluptas ex fugiat natus sed ducimus animi similique doloremque.</SheetDescription>
            </SheetHeader>
            <Form {...form}>
                <form>
                    <div>
                        <div>
                            <FormField
                                control={form.control}
                                name="label"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Label</FormLabel>
                                        <FormControl>
                                            <Input
                                                className='bg-muted'
                                                placeholder='Add Label'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is Public display name
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div>
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Edge Type</FormLabel>

                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a xyz..."></SelectValue>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value='customBeizar'>Bezier</SelectItem>
                                                <SelectItem value='customStepSharp'>Steo</SelectItem>
                                                <SelectItem value='customStraight'>Straight</SelectItem>
                                                <SelectItem value='customStepRounded'>SmoothStep</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            This is Public display name
                                        </FormDescription>
                                        <FormMessage />    
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </form>
            </Form>
        </SheetContent>
    )
}

export default EdgeOptions
